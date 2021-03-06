import React from "react";
import Button from "@material-ui/core/Button";

export const getTheme = muiBaseTheme => ({
  MuiButton: {
    root: {
      "&.MuiButton--chubby": {
        borderRadius: 50
      },
      "&.MuiButton--gradient": {
        minWidth: 150,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        background:
          "linear-gradient(to right, #ffcbcb, #FF5F6D)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        "&:hover": {
          transform: "scale(1.1)"
        }
      }
    },
    label: {
      color: muiBaseTheme.palette.common.white,
      textTransform: "none",
      fontSize: 22.5,
      fontWeight: 700,
      fontFamily: "Noto Serif JP, serif"
    },
    contained: {
      minHeight: 30,
      boxShadow: muiBaseTheme.shadows[0],
      "&$focusVisible": {
        boxShadow: muiBaseTheme.shadows[0]
      },
      "&:active": {
        boxShadow: muiBaseTheme.shadows[0]
      },
      "&$disabled": {
        boxShadow: muiBaseTheme.shadows[0]
      }
    }
  }
});

const GradientButton = (props) => (
  <React.Fragment>
    <Button style={{width: '75px'}} className={"MuiButton--gradient MuiButton--chubby"}>{props.words}</Button>

  </React.Fragment>
);

GradientButton.getTheme = getTheme;
GradientButton.displayName = "Button";
GradientButton.metadata = {
  name: "Gradient",
  description: "Welcome to the new trend"
};

export default GradientButton;
