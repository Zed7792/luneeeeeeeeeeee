"use client"

import { useState, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getNotifications, markAsRead, getUnreadCount } from "@/lib/notification-utils"
import type { Notification } from "@/lib/notification-utils"

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showPanel, setShowPanel] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const loadNotifications = () => {
      const allNotifications = getNotifications()
      setNotifications(allNotifications)
      setUnreadCount(getUnreadCount())
    }

    loadNotifications()

    // Check for new notifications every 5 minutes
    const interval = setInterval(loadNotifications, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    const updated = getNotifications()
    setNotifications(updated)
    setUnreadCount(getUnreadCount())
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-blue-900 text-blue-200",
      medium: "bg-yellow-900 text-yellow-200",
      high: "bg-orange-900 text-orange-200",
      critical: "bg-red-900 text-red-200",
    }
    return colors[priority] || "bg-gray-900 text-gray-200"
  }

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="ghost"
        className="relative text-gray-600 hover:bg-gray-100"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showPanel && (
        <Card className="absolute right-0 mt-2 w-96 bg-slate-800 border-slate-700 z-50">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold text-slate-50">Notifications</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowPanel(false)}
              className="text-slate-400 hover:text-slate-50"
            >
              <X size={16} />
            </Button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-400">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition ${
                    !notification.read ? "bg-slate-700" : "bg-slate-800"
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-50">{notification.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{notification.message}</p>
                      {notification.action && (
                        <a
                          href={notification.action.href}
                          className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {notification.action.label} →
                        </a>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
