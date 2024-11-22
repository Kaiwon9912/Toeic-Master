import React from 'react';
import { useParams } from 'react-router-dom';
import Part1 from './Part1/part1';
import Part2 from './Part2/part2';
import Part3 from './Part3/part3';
import Part4 from './Part4/part4';

function Part() {
    const { part } = useParams(); // Lấy tham số part từ URL

    let content;
    switch (part) {
        case 'part1':
            content = <Part1 />;
            break;
        case 'part2':
            content = <Part2 />;
            break;
        case 'part3':
            content = <Part3 />;
            break;
        case 'part4':
            content = <Part4 />;
            break;
        default:
            content = <div>Không tìm thấy nội dung!</div>; // Xử lý trường hợp không hợp lệ
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Part;