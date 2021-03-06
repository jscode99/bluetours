import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  return (
    <div>
      <Form.Group className="text-left">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
        <Form.Text className="text-muted">{props.errorMsg}</Form.Text>
      </Form.Group>
    </div>
  );
}

export default Input;
