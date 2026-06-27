import { generateId } from "@/lib/id"
import { getDatabase, updateDatabase } from "@/lib/storage/storage"
import type { Notification, NotificationType } from "@/types"

export function getNotificationsForUser(userId: string): Notification[] {
  return getDatabase()
    .notifications.filter((n) => n.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getUnreadCount(userId: string): number {
  return getNotificationsForUser(userId).filter((n) => !n.read).length
}

export function markNotificationRead(notificationId: string): void {
  updateDatabase((db) => ({
    ...db,
    notifications: db.notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    ),
  }))
}

export function markAllNotificationsRead(userId: string): void {
  updateDatabase((db) => ({
    ...db,
    notifications: db.notifications.map((n) =>
      n.userId === userId ? { ...n, read: true } : n
    ),
  }))
}

export function createNotification(input: {
  userId: string
  type: NotificationType
  message: string
  loadId?: string
  offerId?: string
}): Notification {
  const notification: Notification = {
    id: generateId(),
    ...input,
    read: false,
    createdAt: new Date().toISOString(),
  }

  updateDatabase((db) => ({
    ...db,
    notifications: [...db.notifications, notification],
  }))

  return notification
}
