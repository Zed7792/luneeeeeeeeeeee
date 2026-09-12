"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNotifications, markAsRead, checkExpiryNotifications, checkPendingApprovals } from "@/lib/notification-utils"
import { CheckCircle2 } from "lucide-react"
import type { Notification } from "@/lib/notification-utils"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("unread")

  useEffect(() => {
    // Check for new notifications
    checkExpiryNotifications()
    checkPendingApprovals()

    const allNotifications = getNotifications()
    setNotifications(allNotifications)
  }, [])

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-blue-900 text-blue-200",
      medium: "bg-yellow-900 text-yellow-200",
      high: "bg-orange-900 text-orange-200",
      critical: "bg-red-900 text-red-200",
    }
    return colors[priority] || "bg-gray-900 text-gray-200"
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      "expiry-warning": "⏰",
      "pending-approval": "👁️",
      modification: "✏️",
      incident: "⚠️",
      compliance: "✅",
    }
    return icons[type] || "📧"
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Notifications</h1>
          <p className="text-slate-400">System alerts and important updates</p>
        </div>

        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="unread" className="data-[state=active]:bg-blue-600">
              Unread ({notifications.filter((n) => !n.read).length})
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All ({notifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="space-y-4 mt-6">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <p className="text-slate-400">No unread notifications</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <Card key={notification.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="text-3xl">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{notification.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="text-slate-300 mb-3">{notification.message}</p>
                          <div className="flex gap-2">
                            {notification.action && (
                              <a href={notification.action.href}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                                  {notification.action.label}
                                </Button>
                              </a>
                            )}
                            <Button
                              variant="outline"
                              className="border-slate-600 text-sm bg-transparent"
                              onClick={() => {
                                markAsRead(notification.id)
                                setNotifications(getNotifications())
                              }}
                            >
                              <CheckCircle2 size={16} className="mr-1" />
                              Mark as Read
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500 mt-3">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {notifications.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <p className="text-slate-400">No notifications</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${!notification.read ? "bg-slate-700" : "bg-slate-800"} border-slate-700`}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="text-3xl">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{notification.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <p className="text-slate-300 mb-3">{notification.message}</p>
                        {notification.action && (
                          <a href={notification.action.href}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                              {notification.action.label}
                            </Button>
                          </a>
                        )}
                        <p className="text-xs text-slate-500 mt-3">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
