import React, { useState } from 'react';
import axios from 'axios';
import TableQuestions from '../components/TableQuestion';
import ModalQuestion from '../components/ModalQuestion';
import SuccessMessage from '../components/SuccessMessage';  // Import SuccessMessage

const QuestionCRUD = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [loading, setLoading] = useState(false);  // Thêm state loading
    const [successMessage, setSuccessMessage] = useState('');  // State thông báo thành công

    // Mở Modal để thêm câu hỏi mới
    const handleAdd = () => {
        setEditingQuestion(null);
        setModalVisible(true);
    };

    // Mở Modal để chỉnh sửa câu hỏi
    const handleEdit = (question) => {
        setEditingQuestion(question);
        setModalVisible(true);
    };

    // Xử lý gửi dữ liệu (Tạo hoặc Cập nhật câu hỏi)
    const handleSubmit = async (data) => {
        setLoading(true);  // Bắt đầu loading
        try {
            if (editingQuestion) {
                // Cập nhật câu hỏi
                await axios.put(`http://localhost:3000/api/questions/update/${editingQuestion.QuestionID}`, data, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setSuccessMessage('Question updated successfully');  // Thông báo thành công khi cập nhật
            } else {
                // Tạo mới câu hỏi
                await axios.post('http://localhost:3000/api/questions/create', data, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setSuccessMessage('Question added successfully');  // Thông báo thành công khi thêm mới
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);  // Dừng loading
            setModalVisible(false);  // Đóng Modal
        }
    };

    // Xóa câu hỏi
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await axios.delete(`http://localhost:3000/api/questions/delete/${id}`);
                setSuccessMessage('Question deleted successfully');  // Thông báo thành công khi xóa
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Manage Questions</h1>
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Add Question
                </button>
            </div>
            {/* Hiển thị bảng câu hỏi */}
            <TableQuestions onEdit={handleEdit} onDelete={handleDelete} />
            {/* Modal để thêm/sửa câu hỏi */}
            <ModalQuestion
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                initialData={editingQuestion}
                loading={loading}  // Truyền loading vào Modal
            />
            {/* Hiển thị thông báo thành công nếu có */}
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
        </div>
    );
};

export default QuestionCRUD;