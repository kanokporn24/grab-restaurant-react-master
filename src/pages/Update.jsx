import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Update.css';
import { useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
    headers: authHeader(), 
};



const Update = () => {
    let { id } = useParams();
    console.log(id)
    const navigate = useNavigate()
    const [menu, setMenu] = useState({
        name: '',
        type: '',
        img: '',
    });

    const [updateSuccess, setUpdateSuccess] = useState(false); // เพิ่ม state สำหรับการแจ้งเตือนการอัปเดตสำเร็จ


    const fetchMenuItem = async (menuItemId) => {
        try {
            const response = await axios.get(`${URL}/res/${menuItemId}`, config);
            console.log(response.data)
            const menuItemData = response.data;
            setMenu(menuItemData);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเมนูอาหาร:', error);
        }
    };

    const handleUpdateMenu = async () => {
        try {
            const response = await axios.put(`${URL}/res/${menu.id}`, menu, config);
            console.log('อัปเดตเมนูอาหารแล้ว:', response.data);
            setUpdateSuccess(true); 
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตเมนูอาหาร:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMenu({
            ...menu,
            [name]: value,
        });
    };

    useEffect(() => {
        const menuItemId = 'your_menu_item_id_here';
        fetchMenuItem(id);
    }, []);

    const handleCancel = () => {
        navigate('/')
    };

    return (
        <div>
            <h2 className="text-center">Update Menu</h2>
            {updateSuccess && ( // แสดงข้อความเมื่ออัปเดตสำเร็จ
                <div className="alert alert-success form-label" role="alert">
                    อัปเดตเมนูอาหารสำเร็จแล้ว!
                </div>
            )}
            <form className="container-sm">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        ชื่อเมนู:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={menu.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        ประเภท:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={menu.type}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">
                        URL รูปภาพ:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="img"
                        name="img"
                        value={menu.img}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>ตัวอย่างรูปภาพ:</label>
                    <br />
                    <img
                        src={menu.img}
                        className="img-fluid resized-image"
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-success form-control" onClick={handleUpdateMenu}>
                        อัปเดตเมนูอาหาร
                    </button>
                    <button type="button" className="btn btn-danger form-control" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;