// UpperBadge.jsx

const UpperBadge = (
    // { userName }: { userName: string }
) => {
  return (
    <div className="bg-white p-2 flex justify-end space-x-4 px-4 text-sm">
        <a href="/help" className="text-gray-700 hover:text-gray-900">
            Help
        </a>
      <a href="/orders-returns" className="text-gray-700 hover:text-gray-900">
        Orders & Returns
      </a>
      <span className="text-gray-700">|</span>
      <span className="text-gray-700">Hi, User</span>
    </div>
  );
};

export default UpperBadge;
