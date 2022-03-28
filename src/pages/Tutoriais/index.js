import React, { useState } from "react"
import { Container, Header, HeaderText, } from "./styles"
import Btn from 'components/UI/Btn';
import Tutorial from "components/Tutorial";

const Tutoriais = () => {
    const [mostrarTutorial, setMostrarTutorial] = useState(false)

    return(
        <>
            <Header>
                <HeaderText>Tutoriais</HeaderText>
            </Header>
            <Container>
                <Btn
                    style={{marginVertical: 50}}
                    title="Marcação de Áreas"
                    onPress={() => {
                        setMostrarTutorial(!mostrarTutorial)
                    }}
                />
                {mostrarTutorial === true && <Tutorial />}
            </Container>
        </>
    )
}

export default Tutoriais