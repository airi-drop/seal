// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5" width="100%">
      <Card size="3" variant="classic">
        <Flex direction="column" justify="between" height="100%" gap="4">
          <Box>
            <Heading size="4" mb="2">Allowlist Example</Heading>
            <Text size="2">
              Shows how a creator can define allowlist-based access. The creator creates an allowlist and can add or remove users. Encrypted files can be associated with it and only those users can access.
            </Text>
          </Box>
          <Link to="/allowlist-example">
            <Button size="3" variant="solid" color="blue">Try it</Button>
          </Link>
        </Flex>
      </Card>

      <Card size="3" variant="classic">
        <Flex direction="column" justify="between" height="100%" gap="4">
          <Box>
            <Heading size="4" mb="2">Subscription Example</Heading>
            <Text size="2">
              Shows how a creator can define a subscription-based access to its published files...
            </Text>
          </Box>
          <Link to="/subscription-example">
            <Button size="3" variant="solid" color="green">Try it</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Container size="3" px="4" py="5">
      <Flex justify="between" align="center" mb="4">
        <Heading size="6" align="center" style={{ flex: 1, textAlign: 'center' }}>
          Seal Example Apps
        </Heading>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Card mb="5" variant="surface" style={{ padding: '1.5rem' }}>
        <Text size="2" mb="2">
          1. Code is available <a href="https://github.com/MystenLabs/seal/tree/main/examples">here</a>.
        </Text>
        <Text size="2" mb="2">
          2. These examples are for Testnet only. Make sure your wallet is set to Testnet.
        </Text>
        <Text size="2" mb="2">
          3. Files are stored temporarily and may not be retrievable after 1 epoch.
        </Text>
        <Text size="2">4. Only image files are supported for now.</Text>
      </Card>

      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <Text size="3" align="center" weight="medium">Please connect your wallet to continue</Text>
      )}
    </Container>
  );
}

export default App;

