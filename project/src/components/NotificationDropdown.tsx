import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  title: string;
  content: string;
  source: string;
  published_at: string;
}

const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:9080/ws/notifications/");

    socket.onmessage = (event) => {
        console.log("incoming:",event.data);
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
    };

    return () => socket.close();
  }, []);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Bell icon with badge */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200"
      >
        <Bell className="w-6 h-6 text-yellow-500" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm">No new notifications</div>
          ) : (
            notifications.map((n, idx) => (
              <div key={idx} className="p-3 border-b hover:bg-gray-100">
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-600">{n.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(n.published_at).toLocaleString()}
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
