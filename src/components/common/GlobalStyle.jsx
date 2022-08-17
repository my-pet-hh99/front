import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    .fcc {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .findPwDiv {
        flex-flow: column;
        border-radius: 25px;
        background: rgba(255,204,204,.3);
        padding-bottom: 10px;
        & > input {
            padding: 10px;
            border-radius: 25px;
            border-color: rgb(255,204,204);
        }
        & > p {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0 5px 0;
        }
    }
`
export default GlobalStyle