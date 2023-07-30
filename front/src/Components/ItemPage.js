import React, { useState, useEffect } from "react";
import "../css/itempage.css";
import lodash from "lodash";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { LOGGED_IN, setConstraint } from "../constraints";
import { useToasts } from "react-toast-notifications";
import Axios from "axios";
import {
  Button,
  Modal,
  Form,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";

function ItemPage(props) {
  const { addToast } = useToasts();
  const [Itemname, setItemname] = useState("");
  const [ActivationRequest,setActivationRequest]=useState(false)

  const [Createdby, setCreatedby] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [index, setIndex] = useState(0);
  const [authenticationPage, setauthenication] = useState("");

  const [validateUser, setvalidateUser] = useState(false);
  const [Question, setQuestion] = useState(false);
  const [alreadyAnswered, setalreadyAnswered] = useState(false);
  const [showQuestion, setshowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [itemid, setitemid] = useState("");
  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [newitemimage, setnewitemimage] = useState([]);
  const [type, settype] = useState("");
  const [messageId, setmessageId] = useState("");
  const [response, setResponse] = useState("");
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseprompt = () => setvalidateUser(false);
  const handleShowprompt = (id, answer) => {
    console.log("Selected message ID is :", id);
    console.log("Answer is :", answer);
    setmessageId(id);
    setResponse(answer);
    setvalidateUser(true);
  };
  const handleCloseActivation=()=>{
    setActivationRequest(false)
  }
  const submitActivate=()=>{
    
    Axios({
      method: "POST",
      url: `http://localhost:5000/activateItem/${item_id}`,
    })
      .then((res) => {
        console.log("Activated");
        addToast("Item Activated 👍", {
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setActivationRequest(false)
  }
  const handleCloseQuestion = () => setQuestion(false);
  const handleShowQuestion = () => setQuestion(true);
  const handleShow = () => setShow(true);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const history = useHistory();
  setConstraint(true);
 
  const item_type = props.location.search
    .substring(1)
    .split("=")[2]
    .split("/")[0];
  const item_id = props.location.search
    .substring(1)
    .split("=")[1]
    .split("&")[0];

  const current_user = props.location.search.substring(1).split("/")[1];

  const temp = [];
  const validation = [];

  useEffect(() => {
    const { location } = props;
    Axios({
      url: `http://localhost:5000/item/${item_id}`,
      method: "GET",
    })
      .then((response) => {
        const data = response.data.Item[0];
        const answers = response.data.Answers;
        console.log(data);
        answers.forEach((ans) => {
          if (JSON.parse(localStorage.getItem("user"))._id === ans.givenBy) {
            console.log("Present");
            setalreadyAnswered(true);
            console.log(alreadyAnswered);
          }
         
        });
        setitemid(data._id);
        setitemname(data.name);
        setdescription(data.description);
        setitemquestion(data.question);
        settype(data.type);
        setCreatedby(data.createdBy);
        setitemimage([]);
        data.itemPictures.map((img) => {
          setitemimage((itemImg) => [...itemImg, img]);
        });
        console.log(itemimage);
        let created_date = new Date(data.createdAt);
        let createdAt =
          created_date.getDate() +
          "/" +
          created_date.getMonth() +
          "/" +
          created_date.getFullYear() +
          " " +
          created_date.getHours() +
          ":" +
          created_date.getMinutes();
        console.log(data);
        temp.push(
          <div className="itemDescription">
            <h3 className="attributes">
              Item name : <span className="details">{data.name}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Item description :{" "}
              <span className="details">{data.description}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Item type : <span className="details">{data.type}</span>{" "}
            </h3>
            <hr></hr>
            <h3 className="attributes">
              Status :
              {data.status ? (
                <>
                  <span className="details"> Active</span>
                </>
              ) : (
                <>
                  <span className="details">Inactive</span>
                </>
              )}{" "}
            </h3>
            <hr></hr>
            <h6 className="attributes">
              Created at : <span className="details">{createdAt}</span>{" "}
            </h6>
            {current_user === "true" ? (
              <div className="ed-button">
                <Button variant="danger" onClick={handleShowDelete}>
                  Delete item
                </Button>
             
                {data.status ? (
                  <></>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setActivationRequest(true)}
                    >
                      Reactivate Item
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div>
                {alreadyAnswered ? (
                  <div className="ed-button">
                    <Button
                      variant="secondary"
                      disabled
                      onClick={handleShowQuestion}
                    >
                      {data.type === "Lost" ? "Found Item" : "Claim Item"}
                    </Button>
                  </div>
                ) : (
                  <div className="ed-button">
                    <Button variant="primary" onClick={handleShowQuestion}>
                      {data.type === "Lost" ? "Found Item" : "Claim Item"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        setItemname(temp);
        console.log(answers);
        answers.map((e) => {
          let created_date = new Date(e.createdAt);
          e.createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          // console.log(e);
        });
        validation.push(
          <div>
            {current_user === "true" ? (
              <div >
                <div>
                  <h2 style={{color:"#000"}} className="attributes">Your Question :</h2>
                  <h3 style={{color:"#000"}}>{data.question}</h3>
                </div>

                <div>
                  <h2 style={{color:"#000"}} className="attributes">Answers Submitted :</h2>
                  {answers.length === 0 ? (
                    <h3 style={{color:"#000"}}>No Answers Yet.</h3>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {answers.map((answer) => (
                        <>
                          <div className="responses">
                            <Card border="primary" style={{ width: "18rem" }}>
                              <Card.Body>
                                <Card.Title>
                                  Answer : {answer.answer}
                                </Card.Title>
                              </Card.Body>
                              <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                  Date : {answer.createdAt}
                                </ListGroupItem>
                                <ListGroupItem>Validate :</ListGroupItem>
                              </ListGroup>
  
                              <Card.Body>
                                {answer.response === "Moderation" ? (
                                  <div className="ed-button">
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleShowprompt(answer._id, "No")
                                      }
                                    >
                                      No
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        handleShowprompt(answer._id, "Yes")
                                      }
                                    >
                                      Yes
                                    </Button>
                                  </div>
                                ) : (
                                  <p style={{color:"#000"}}>
                                    Already Submitted as "{answer.response}"
                                  </p>
                                )}
                              </Card.Body>
                            </Card>
                          </div>
                         
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
        setauthenication(validation);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [alreadyAnswered]);
  const submitResponse = () => {
    // console.log(e.target.value)
    Axios({
      url: `http://localhost:5000/confirmResponse/${messageId}`,
      method: "POST",
      data: { response: response },
    })
      .then((res) => {
        console.log(res);
        addToast("Response saved 👍", {
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseprompt(true);
  };
  const delete_item = () => {
    console.log("deleted");
    Axios({
      url: "http://localhost:5000/deleteitem",
      method: "POST",
      data: { item_id },
    })
      .then((response) => {
        console.log(response);
        handleCloseDelete();
        addToast("Item kicked to 🗑️ successfully!", {
          appearance: "success",
        });
        setTimeout(() => {
          history.push("/feed");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error"+err);
      });
  };
  const handleEdit = () => {
    console.log("handleedit")
    const info = new FormData();
    info.append("name", itemname);
    info.append("description", description);
    info.append("question", itemquestion);
    info.append("type", type);
    info.append("id", item_id);
    info.append("createdBy", Createdby);
    // console.log(newitemimage.length)
    if (newitemimage.length > 0) {
      newitemimage.map((itemImage) => {
        info.append("itemPictures", itemImage, itemImage.name);
      });
    } else {
      console.log("Old one");
      itemimage.map((image) => {
        console.log(image);
        info.append("olditemPictures", image.img);
      });
    }
    Axios({
      url: "http://localhost:5000/edititem",
      method: "POST",
      data: info,
    })
      .then((res) => {
        console.log(res);
        addToast("Item edited✏️ successfully!", {
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setShow(false);
  };
  
  const show_question = () => {
    // console.log("Number Shown");
    setshowQuestion(true);
  };
  const submitAnswer = () => {
    Axios({
      url: "http://localhost:5000/submitAnswer",
      method: "POST",
      data: {
        itemId: item_id,
        question: itemquestion,
        answer: answer,
        givenBy: JSON.parse(localStorage.getItem("user")),
        belongsTo: Createdby,
      },
    })
      .then((res) => {
        console.log(res);
        handleCloseQuestion();
        addToast("Response saved ✔️", {
          appearance: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setAnswer("");
  };
  
  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="itempage">
          <Carousel autoPlay className="carousel" infiniteLoop width="50%">
            {itemimage.map((i) => {
              return (
                <div style={{ border: "2px solid black" }}>
                  <img
                    src={`https://tidiompbucket786.s3.ap-northeast-1.amazonaws.com/${i.img}`}
                    alt="item"
                  />
                </div>
              );
            })}
          </Carousel>
          <div>{Itemname}</div>
        </div>
        <div>{authenticationPage}</div>
      </Container>

      <Modal show={ActivationRequest} onHide={handleCloseActivation} backdrop="static">
        <Modal.Body>
          <p style={{color:"#000"}}>Are you sure ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseActivation}>
            No
          </Button>
          <Button variant="danger" onClick={submitActivate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Body>
          <p style={{color:"#000"}}>Are you sure ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button variant="danger" onClick={delete_item}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={validateUser} onHide={handleCloseprompt} backdrop="static">
        <Modal.Body>
          <p style={{color:"#000"}}>Once submitted you can not undo. Are you sure ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleCloseprompt(true)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitResponse}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={Question} onHide={handleCloseQuestion} backdrop="static">
        {showQuestion ? (
          <div>
            <Modal.Body>
              <Form.Group>
                <Form.Label>{itemquestion}</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseQuestion}>
                Close
              </Button>
              <Button variant="primary" onClick={submitAnswer}>
                Submit
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Body>
              <p style={{color:"#000"}}>Are you sure you found the item? </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseQuestion}>
                No
              </Button>
              <Button variant="danger" onClick={show_question}>
                Yes
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Lost item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Item name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item"
                  value={itemname}
                  onChange={(e) => setitemname(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter a question based on the item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex:- What is the color of the phone ?"
                  value={itemquestion}
                  onChange={(e) => setitemquestion(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item type</Form.Label>
                <Form.Control
                  as="select"
                  required={true}
                  defaultValue="Choose..."
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
                  <option>Choose..</option>
                  <option value={"Lost"}>Lost It</option>
                  <option value={"Found"}>Found It</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.File
                  type="file"
                  id="formimage"
                  label="Image input"
                  onChange={(e) => {
                    let { files } = e.target;
                    lodash.forEach(files, (file) => {
                      setnewitemimage((item) => [...item, file]);
                    });
                  }}
                  multiple
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ItemPage;
