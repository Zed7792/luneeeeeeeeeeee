export type NotificationType = "expiry-warning" | "pending-approval" | "modification" | "incident" | "compliance"
export type NotificationPriority = "low" | "medium" | "high" | "critical"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  priority: NotificationPriority
  read: boolean
  createdAt: string
  relatedId?: string
  action?: {
    label: string
    href: string
  }
}

export function saveNotification(notification: Omit<Notification, "id" | "createdAt">) {
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  notifications.push(newNotification)
  localStorage.setItem("notifications", JSON.stringify(notifications))
  return newNotification
}

export function getNotifications(): Notification[] {
  return JSON.parse(localStorage.getItem("notifications") || "[]")
}

export function markAsRead(notificationId: string) {
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
  const updated = notifications.map((n: Notification) => (n.id === notificationId ? { ...n, read: true } : n))
  localStorage.setItem("notifications", JSON.stringify(updated))
}

export function getUnreadCount(): number {
  const notifications = getNotifications()
  return notifications.filter((n: Notification) => !n.read).length
}

export function checkExpiryNotifications() {
  const sdsLibrary = JSON.parse(localStorage.getItem("sds-library") || "[]")
  const notifications = getNotifications()
  const now = new Date()

  sdsLibrary.forEach((sds: any) => {
    if (sds.expiryDate) {
      const expiryDate = new Date(sds.expiryDate)
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // Create notifications for 30, 60, and 90 day warnings
      if ([30, 60, 90].includes(daysUntilExpiry)) {
        const existingNotification = notifications.find(
          (n) =>
            n.type === "expiry-warning" && n.relatedId === sds.id && n.message.includes(daysUntilExpiry.toString()),
        )

        if (!existingNotification) {
          saveNotification({
            type: "expiry-warning",
            title: `SDS Expiry Warning: ${sds.productName}`,
            message: `Safety Data Sheet for ${sds.productName} will expire in ${daysUntilExpiry} days`,
            priority: daysUntilExpiry <= 30 ? "high" : "medium",
            read: false,
            relatedId: sds.id,
            action: {
              label: "View SDS",
              href: `/sds-library/${sds.id}`,
            },
          })
        }
      }
    }
  })
}

export function checkPendingApprovals() {
  const modifications = JSON.parse(localStorage.getItem("modifications") || "[]")
  const notifications = getNotifications()

  const pendingCount = modifications.filter((m: any) => m.status === "pending").length
  const existingNotification = notifications.find((n) => n.type === "pending-approval")

  if (pendingCount > 0 && !existingNotification) {
    saveNotification({
      type: "pending-approval",
      title: "Pending Approvals",
      message: `You have ${pendingCount} pending modification(s) awaiting approval`,
      priority: "high",
      read: false,
      action: {
        label: "Review",
        href: "/modifications",
      },
    })
  }
}
