import './App.css';
import React from 'react';

class App extends React.Component {
  state: {
    person: {
      fullName: string;
      bio: number;
      imgSrc: string;
      profession: string;
    };
    show: boolean;
    timeElapsed: number;
    timer: NodeJS.Timeout | null;
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      person: {
        fullName: "Baha",
        bio: 27,
        imgSrc: "https://gomycodelearn.blob.core.windows.net/assets/images/general/gomycodeLogo.svg",
        profession: "team leader",
      },
      show: false,
      timeElapsed: 0,
      timer: null,
    };
  }

  startTimer = () => {
    if (!this.state.timer) {
      this.setState({ timer: setInterval(() => {
        this.setState((prevState) => ({
          timeElapsed: prevState.timeElapsed + 1,
        }));
      }, 1000) });
    }
  }

  stopTimer = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({ timer: null });
    }
  }

  handleShow = () => {
    if (!this.state.show) {
      this.startTimer();
    } else {
      this.stopTimer();
      this.setState({ timeElapsed: 0 });
    }

    this.setState({ show: !this.state.show });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleShow}>Click me!</button>
        {this.state.show ?
          <div>
            <h1>I'm {this.state.person.fullName}</h1>
            <h1>My age is {this.state.person.bio}</h1>
            <img src={this.state.person.imgSrc} alt={this.state.person.fullName} />
            <h1>I'm {this.state.person.profession}</h1>
          </div> :
          <div></div>
        }
        {this.state.show && <p>Time Elapsed: {this.state.timeElapsed} seconds</p>}
      </div>
    )
  }
}

export default App;
