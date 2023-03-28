import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categoties, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} đã được thêm`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi gì đó trong quá trình thêm mới");
    }
    setName("");
  };
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/getAllCategory"
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
      console.log();
    } catch (error) {
      console.log(error);
      toast.error("Có gì đó đang lỗi khi tạo danh mục");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //updated category
  const handleUpdatedName = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} đã được cập nhật`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có gì đó lỗi khi sửa danh mục");
    }
  };

  //deleted category
  const handleDeleteddName = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${pid}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Danh mục đã được xóa thành công`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có gì đó lỗi khi sửa danh mục");
    }
  };
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Quản lý danh mục</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Danh Mục</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {categoties.map((categoty) => (
                    <tr key={categoty._id}>
                      <td>{categoties.indexOf(categoty) + 1}</td>
                      <td>{categoty.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setOpen(true);
                            setUpdatedName(categoty.name);
                            setSelected(categoty);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDeleteddName(categoty._id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              {" "}
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
