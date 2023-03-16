import { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import Header from "./Header";
import { randomName } from "./Utility/Utils";
import randomColorRGB from "random-color-rgb";

class App extends Component {
    state = {
        messages: [],
        member: {
            username: randomName(),
            color: randomColorRGB(),
        },
    };

    constructor() {
        super();
        this.drone = new window.Scaledrone("YfeyvT4sdh9Mq1Xs", {
            data: this.state.member,
        });
    }

    componentDidMount() {
        this.drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });

        const room = this.drone.subscribe("observable-room");

        room.on("data", (data, member) => {
            const messages = this.state.messages;
            const timestamp = new Date().toISOString();
            messages.push({ member, text: data, timestamp });
            this.setState({ messages });
        });
    }

    onSendMessage = (message) => {
        if(message.length > 0){
            this.drone.publish({
                room: "observable-room",
                message,
            });
        }
    };

    render() {
        return (
            <div className="App">
                <Header />
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}

export default App;
