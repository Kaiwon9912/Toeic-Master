import { useEffect, useState } from 'react';

const SuccessModal = ({ successMessage }) => {
  // State để điều khiển modal
  const [isVisible, setIsVisible] = useState(true);

  // Đóng modal sau 1 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Đóng modal sau 1 giây
    }, 1000); // Thời gian giữ modal là 1 giây

    // Dọn dẹp timer khi component bị hủy
    return () => clearTimeout(timer);
  }, []);

  // Nếu modal không cần hiển thị nữa, không render
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        {/* Thêm GIF thay cho ảnh PNG */}
        <img className="w-20 m-auto" src="/path/to/your/success.gif" alt="Success" />
        
        <h3 className="text-green-700 text-center">{successMessage}</h3>
      </div>
    </div>
  );
};

export default SuccessModal;
