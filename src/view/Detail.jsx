import styled from "styled-components";
import Layout from "../components/common/Layout";
import DetailImage from "../components/DetailImage";
import DetailContents from "../components/DetailContents"
const Detail = () => {
    return (
        <Layout>
            <Box>
                <DetailImage />
                <DetailContents />
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


