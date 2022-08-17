import React from "react"
import styled from "styled-components"
import Layout from "../components/common/Layout"

//components
import Header from '../components/Header'
import PostInput from "../components/main/PostInput"
import PostCard from "../components/main/PostCard"

const Main = () => {
    return (
        <Layout>
            <MainLayout>
                <Header/>
                <PostInput/>
                <PostCard/>
            </MainLayout>
        </Layout>
    )
}

export default Main

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
`