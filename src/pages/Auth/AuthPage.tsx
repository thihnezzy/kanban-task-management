import {
  Container,
} from '@mantine/core';
import React from 'react';

import AuthenticationForm from '@/components/Auth/AuthForm';

function AuthenticationPage(): React.ReactElement {
  return (
    <Container className='flex justify-center items-center h-screen'>
      <AuthenticationForm />
    </Container>
  );
}

export default AuthenticationPage;
