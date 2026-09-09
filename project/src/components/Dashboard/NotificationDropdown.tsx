import React, { useState } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
}

interface Props {
  notifications: Notification[];
}

const NotificationDropdown: React.FC<Props> = ({ notifications }) => {
  const [open, setOpen] = useState(false);

  // Badge shows unread count = total notifications
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Bell icon with badge */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm">No new notifications</div>
          ) : (
            notifications.map((n, idx) => (
              <div
                key={n.id}
                className={`p-3 border-b transition ${
                  idx === 0 ? "bg-yellow-50" : "hover:bg-gray-100"
                }`}
              >
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-600">{n.content}</p>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(n.published_at), { addSuffix: true })}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
