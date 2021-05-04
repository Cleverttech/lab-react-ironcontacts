import React, { Component } from "react";
import contacts from "../contacts.json";

class ActorDetails extends Component {
  //use array to mount state
  state = {
    actors: contacts.slice(0, 5),
  };

  handleAdd = () => {
    const { actors } = this.state;
    let randomIndex = Math.ceil(Math.random() * contacts.length);
    let randomActor = contacts[randomIndex];

    this.setState({
      actors: [randomActor, ...actors],
    });
  };

  handleSortName = () => {
    const { actors } = this.state;

    let clonedActors = JSON.parse(JSON.stringify(actors));
    clonedActors.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });

    this.setState({
      actors: clonedActors,
    });
  };

  handleSortPop = () => {
    const { actors } = this.state;

    let clonedActors = JSON.parse(JSON.stringify(actors));
    clonedActors.sort((a, b) => {
      return a.popularity - b.popularity;
    });

    this.setState({
      actors: clonedActors,
    });
  };

  handleDelete = (actorsId) => {
    const { actors } = this.state;

    console.log("delete working", actorsId);
    let filteredActors = actors.filter((singleActor) => {
      return singleActor.id !== actorsId;
    });

    this.setState({
      actors: filteredActors,
    });
  };

  render() {
    const { actors } = this.state;

    return (
      <div>
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleSortName}>Sort by Name</button>
        <button onClick={this.handleSortPop}>Sort by popularity</button>
        {actors.map((a, index) => {
          return (
            <div key={a.id + index}>
              <ul>
                <li>
                  <img src={a.pictureUrl} width="100px"></img>
                  {a.name}
                  {a.popularity}
                </li>
              </ul>
              <button
                onClick={() => {
                  this.handleDelete(a.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ActorDetails;
