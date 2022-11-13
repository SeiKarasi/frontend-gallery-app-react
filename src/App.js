import React, { Component } from 'react';
import './App.css';
import { user_models } from './Models/user_models';
import { picture_models } from './Models/picture_models';
import Picture from './Components/picture/Picture.component';
import 'tachyons';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user_models: user_models,
      picture_models: picture_models,
      loginDataVisibility: false,
      registerDataVisibility: false,
      logoutVisibility: sessionStorage.getItem("username") !== null ? true : false
    }
  }

  visibleLogin = () => {
    const visibility = this.state.loginDataVisibility;
    this.setState({ loginDataVisibility: !visibility });
    if (this.state.registerDataVisibility) {
      const registerVisibility = this.state.registerDataVisibility;
      this.setState({ registerDataVisibility: !registerVisibility });
    }
  }

  visibleRegister = () => {
    const visibility = this.state.registerDataVisibility;
    this.setState({ registerDataVisibility: !visibility });
    if (this.state.loginDataVisibility) {
      const loginVisibility = this.state.loginDataVisibility;
      this.setState({ loginDataVisibility: !loginVisibility });
    }
  }


  Login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    for (let i = 0; i < user_models.length; i++) {
      if (username === user_models[i].username && password === user_models[i].password) {
        const visibility = this.state.logoutVisibility;
        this.setState({ logoutVisibility: !visibility });
        sessionStorage.setItem("username", document.getElementById('username').value);
        console.log('Sikeres bejelentkezés!');
        return true;
      }
    }
    alert("Sikertelen bejelentkezés");
    return false;
  }

  Register = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password_again = document.getElementById('password_again').value;
    if (password !== password_again) {
      alert("Sikertelen regisztráció!");
      return false;
    } else {
      let i = 0;
      for (i = 0; i < user_models.length; i++) {
        if (username === user_models[i].username) {
          alert("Sikertelen regisztráció!");
          return false;
        }
      }
        var users = this.state.user_models;
        users.push({
          username: username,
          password: password
        });
        this.setState({user_models: users});
        return true;
    }   
  }


  Logout = () => {
    const visibility = this.state.logoutVisibility;
    this.setState({ logoutVisibility: !visibility });
    sessionStorage.clear();
  }

  Upload = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var pictures = this.state.picture_models;
    pictures.push({
      src: document.getElementById("url").value,
      author: sessionStorage.getItem("username"),
      createdAt: today,
      comments: []
    });
    this.setState({picture_models: pictures});

  }

  pictureDelete = (pictureIndex) => {
    const pictures = this.state.picture_models;
    pictures.splice(pictureIndex, 1);
    this.setState({ picture_models: pictures });
  }

  addComment = (pictureIndex) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var pictures = this.state.picture_models;
    pictures[pictureIndex]["comments"].push({
      author: sessionStorage.getItem("username"),
      comment: document.getElementById("newComment" + pictureIndex).value,
      createdAt: today
    }
    );
    this.setState({ picture_models: pictures });
  }

  render() {
    console.log(user_models);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;


    console.log("render");
    return (
      <div className="App">
        <h1 className="Main_title">Welcome to the gallery application</h1>
        {!this.state.logoutVisibility ?
          <div>
            <button className="Login_access_button" onClick={this.visibleLogin}>Login</button>
            <button className="Register_access_button" onClick={this.visibleRegister}>Signup</button>
          </div>
          :
          <div className='tc'>
            <button className="Logout_button" onClick={this.Logout}>Log out</button>
            {
              this.state.picture_models.map((model, index) => {
                let id = "newComment" + index;
                return (
                  <div className='tc'>
                    <Picture
                      src={model.src}
                      author={model.author}
                      createdAt={model.createdAt}
                      comments={model.comments}
                      deletePicture={() => this.pictureDelete(index)}
                      addComment={() => this.addComment(index)}
                    />
                    <input className="bg-light-yellow input-reset b--black-100 pa2 w-50" id={id} type="text" placeholder='Write a comment...' />
                  </div>
                )
              })
            }
                <label className="dib f3-ns no-underline bg-light-yellow black-90" htmlFor="url">New picture URL: </label><br/>
                <input className="bg-light-yellow input-reset b--black-100 pa2 w-50" id="url" type="text" name="url" placeholder='Write an URL...'/>
                <input className="grow dib f3-ns bg-light-yellow black-90 pointer" type="button" value="Upload" onClick={this.Upload} />
          </div>
        }
        {this.state.loginDataVisibility ?
          <form className='tc'>
            <label htmlFor="username">Username:</label>
            <input id="username" className="LoginRegister_data" type="text" name="username" /> <br />
            <label htmlFor="password">Password:</label>
            <input id="password" className="LoginRegister_data" type="password" name="password" />
            <input className="LoginRegister_button" type="submit" value="Login" onClick={this.Login} />
          </form> : null
        }
        {this.state.registerDataVisibility ?
          <form className='tc'>
            <label htmlFor="username">Username:</label>
            <input id="username" className="LoginRegister_data" type="text" name="username" /> <br />
            <label htmlFor="password">Password:</label>
            <input id="password" className="LoginRegister_data" type="password" name="password" /> <br />
            <label htmlFor="password_again">Password again:</label>
            <input id="password_again" className="LoginRegister_data" type="password" name="password_again" />
            <input className="LoginRegister_button" type="submit" value="Register" onClick={this.Register} />
          </form> : null
        }
      </div>
    );
  }
}


export default App;
