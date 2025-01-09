import React from 'react';

const RecentComponent = ({ activities = []}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Recent Activities
      </h2>

      <div className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="p-3 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
            >
              <p className="text-gray-800 dark:text-gray-200">
                {activity.description}
              </p>
              <small className="text-gray-500 dark:text-gray-400">
                {activity.date}
              </small>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">No Recent Activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentComponent;
