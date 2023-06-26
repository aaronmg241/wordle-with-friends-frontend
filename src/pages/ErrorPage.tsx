import { Flex } from '@chakra-ui/react'
type Props = {
	text: string
}

export default function ErrorPage({ text }: Props) {
	return <Flex height='100%' width='100%' justifyContent='center' alignItems='center'></Flex>
}
