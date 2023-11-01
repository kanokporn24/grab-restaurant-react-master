/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Add.css'



const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

const Add = () => {
    const navigate = useNavigate()
    // สร้าง state เพื่อเก็บข้อมูลเมนูอาหาร
    const [menu, setMenu] = useState({
        name: '',
        type: '',
        img: '',

    });

    const [updateSuccess, setUpdateSuccess] = useState(false); // เพิ่ม state สำหรับการแจ้งเตือนการอัปเดตสำเร็จ

    // ฟังก์ชันเมื่อข้อมูลเมนูเปลี่ยนแปลง
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMenu({
            ...menu,
            [name]: value,
        });
    };

    const handleAddMenu = async () => {
        try {
            const response = await axios.post(`${URL}/res`, menu, config);
            console.log('เพิ่มเมนูอาหารแล้ว:', response.data);
            setUpdateSuccess(true);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเพิ่มเมนูอาหาร:', error);
        }
    };

    const handleCancel = () => {
        navigate('/')
    };

    return (
        <div>
            <h2 className="text-center">Add Menu</h2>
            {updateSuccess && ( // แสดงข้อความเมื่ออัปเดตสำเร็จ
                <div className="alert alert-success form-label" role="alert">
                    เพิ่มเมนูอาหารแล้ว!
                </div>
            )}
            <form className="container-sm">
                <div className="mb-3">
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
                            required
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label resized-image">
                            URL รูปภาพ:
                        </label>
                        <input
                            type="url"
                            className="form-control"
                            id="img"
                            name="img"
                            value={menu.img}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>ตัวอย่างรูปภาพ:</label>
                        <br />
                        <img src={menu.img} className="img-fluid resized-image"
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-success form-control" onClick={handleAddMenu}>
                        เพิ่มเมนูอาหาร
                    </button>
                    <button type="button" className="btn btn-danger form-control" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
