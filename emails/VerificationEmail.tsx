import * as React from 'react';
import { Html,Head,Preview,Row, Section,Heading,Text } from "@react-email/components";

interface props{
    username:string;
    otp:string;
}

export function Email({username,otp}:props) {

  return (
    <Html lang="en">
     <Head>
        <title>OTP Verification</title>
     </Head>
     <Preview>Here&apos;s your verification code: </Preview>
     <Section>
        <Row>
            <Heading> Hello {username}</Heading>
        </Row>
        <Row>
            <Text>
                Thank You for Registering. Please use the 
                following verification
                code to complete your registration 
            </Text>
        </Row>
        <Row>
            <Text>{otp}</Text>
        </Row>
        <Row>
            <Text>If you did not request for a code, please ignore this mail</Text>
        </Row>
     </Section>
    </Html>
  );
}

export default Email;
