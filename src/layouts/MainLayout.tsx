import { Container, Paper, Divider, Text  } from "@mantine/core";

import { Mail } from "../types/mail";

const MainLayout = ({content}: {content: Mail | null}) => {

  if (!content)
    return (<></>)

  return (
    <Container fluid>
      <Paper>
        <Text size="lg">{content.subject}</Text>
        <Text size="lg">From {content.from} ({content.date.slice(2,10)})</Text>
        <Divider my="md"/>
        <Text>{content.text}</Text>
        <Text>{content.html}</Text>
      </Paper>
    </Container>

  )
}

export default MainLayout