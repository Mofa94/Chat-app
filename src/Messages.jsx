import { Component } from "react";

class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map((message) => this.renderMessage(message))}
            </ul>
        );
    }

    renderMessage(message) {
        const { member, text, timestamp } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
            ? "Messages-message currentMember"
            : "Messages-message";

        return (
            <li className={className} key={timestamp}>
                <span
                    className="avatar"
                    style={{ backgroundColor: member.clientData.color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username},{" "}
                        {new Date(timestamp).toLocaleTimeString("hr-HR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;
