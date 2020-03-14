import React from 'react'
import Header from 'components/Header'
import Entry from 'components/Entry'
import Container from 'components/Container'
import Notes from 'components/Notes'


const Home = props => (
    <>
        <Container className="grid-lg">
            <Header />
            <Entry />
            <Notes />
        </Container>
    </>
)

export default Home