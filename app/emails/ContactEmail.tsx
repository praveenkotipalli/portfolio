import * as React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Font } from '@react-email/font';
import { Preview } from '@react-email/preview';
import { Heading } from '@react-email/heading';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Hr } from '@react-email/hr';

interface ContactEmailProps {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  interest,
  message,
}) => (
  <Html lang="en">
    <Head>
      <Font
        fontFamily="Actor"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://fonts.gstatic.com/s/actor/v16/wEKyNXRiS3C3c3k.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>New Portfolio Message from {name}</Preview>
    <Section style={main}>
      <Heading style={heading}>New Message from your Portfolio</Heading>
      <Text style={paragraph}>You received the following message:</Text>
      
      <Hr style={hr} />
      
      <Text style={label}>From:</Text>
      <Text style={value}>{name}</Text>
      
      <Text style={label}>Email:</Text>
      <Text style={value}>{email}</Text>
      
      <Text style={label}>Interested in:</Text>
      <Text style={value}>{interest}</Text>
      
      {message && (
        <>
          <Text style={label}>Message:</Text>
          <Text style={value}>{message}</Text>
        </>
      )}
    </Section>
  </Html>
);

export default ContactEmail;

// --- Styles ---
const main = {
  backgroundColor: '#111111',
  fontFamily: '"Actor", sans-serif',
  color: '#ffffff',
  padding: '40px 20px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#CFCFCF',
};

const paragraph = {
  fontSize: '16px',
  color: '#CFCFCF',
};

const label = {
  fontSize: '14px',
  color: '#888888',
  margin: '0',
};

const value = {
  fontSize: '18px',
  color: '#ffffff',
  marginTop: '4px',
};

const hr = {
  borderColor: '#333333',
  margin: '20px 0',
};