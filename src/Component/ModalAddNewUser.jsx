import { Modal, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import { postCreateUse } from "../Service/UserService";
import { toast } from "react-toastify";

function ModalAddNewUser(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const handleSaveUser = async () => {
    if (ref1.current.value === "" || ref2.current.value === "") {
      toast.error("Failed to Create");
    } else {
      let res = await postCreateUse(name, job);
      // console.log(res);
      if (res && res.id) {
        handleClose();
        setName("");
        setJob("");
        toast.success(" Create new user successed");
        handleUpdateTable({ first_name: name, id: res.id });
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  ref={ref1}
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
                  ref={ref2}
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
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNewUser;
