import styled from "styled-components";
import Layout from "../components/common/Layout";
import Header from "../components/Header"
import DetailContents from "../components/detail/DetailContents"
import CommentArea from "../components/comment/CommentArea";

const Detail = () => {
    return (
        <Layout>
            <Box>
                <Header/>
                <DetailContents />
                <CommentArea/>
            </Box>
        </Layout>
    )
}

export default Detail

const Box = styled.div`
  display: flex;
  flex-direction:column;
  width: 800px ;
  margin: auto;
`;


