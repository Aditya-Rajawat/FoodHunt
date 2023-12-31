import { Component } from "react";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super();

    // console.log("Parent constructor")
  }

  componentDidMount() {
    // console.log("Parent componentDidMount")
  }

  render() {
    // console.log("Parent render")

    return (
      <>
        <div className="font-bold my-14 mx-10 text-3xl flex">
          <p className="text-black">User :&nbsp;</p>
          <UserContext.Consumer>
            {({ LoggedInUser }) => <h4>{LoggedInUser}👋</h4> }
          </UserContext.Consumer>
        </div>
        <UserClass name={"First Child"} location={"Govind Nagar"} />
      </>
    );
  }
}

export default About;
