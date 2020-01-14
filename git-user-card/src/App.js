import React, { Component } from "react"
import axios from "axios"
import Usercard from "./components/Usercard"

class App extends Component {
  constructor() {
    super()
    console.log("inside constructor")
  }
  state = {
    user: [],
    followers: []
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/WindTalker22")
      .then(res => {
        // res.data.message
        console.log(res)
        this.setState({
          user: res.data
        })
        console.log(this.state)
      })
      .catch(err => console.log(err))
      .finally(
        axios
          .get(`https://api.github.com/users/WindTalker22/followers`)
          .then(res => {
            console.log(res)
            this.setState({
              followers: res.data
            })
          })
          .catch(err => {
            console.log(err)
          })
          .finally(console.log("axios call complete"))
      )
  }

  render() {
    console.log(this.state)
    return (
      <section className="card-container">
        <Usercard user={this.state.user} />
        {this.state.followers.map((follower, i) => {
          return <Usercard key={i} user={follower} />
        })}
      </section>
    )
  }
}

export default App
