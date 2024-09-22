import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { updateUser } from "../Service/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await updateUser(name, job);
    if (res && res.updateAt) {
      handleEditUserFromModal({
        ...dataUserEdit,
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success("Update User Successed");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-4">
                <label className="form-label">Job</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter job"
                  value={job}
                  onChange={(e) => {
                    setJob(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
