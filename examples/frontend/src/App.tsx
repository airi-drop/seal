// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0


import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
} from '@radix-ui/themes';
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
    <Grid columns={{ initial: '1', md: '2' }} gap="4" width="100%">
      <Card size="3" variant="surface">
        <Flex direction="column" height="100%" justify="between" gap="4">
          <Box>
            <Flex justify="between" align="center" mb="2">
              <Heading size="4">Allowlist Example</Heading>
              <Badge color="blue" variant="solid">Testnet Only</Badge>
            </Flex>
            <Text size="2">
              Buat dan kelola akses menggunakan sistem allowlist. Hanya pengguna yang terdaftar yang bisa membuka file terenkripsi.
            </Text>
          </Box>
          <Link to="/allowlist-example">
            <Button size="3" variant="solid" color="blue">Try it</Button>
          </Link>
        </Flex>
      </Card>

      <Card size="3" variant="surface">
        <Flex direction="column" height="100%" justify="between" gap="4">
          <Box>
            <Flex justify="between" align="center" mb="2">
              <Heading size="4">Subscription Example</Heading>
              <Badge color="green" variant="solid">Testnet Only</Badge>
            </Flex>
            <Text size="2">
              Berikan akses ke konten terenkripsi berdasarkan langganan yang dapat diatur langsung oleh kreator.
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
    <Container size="3" py="6">
      <Flex justify="between" align="center" mb="5">
        <Heading size="6" weight="bold" align="center" style={{ flex: 1, textAlign: 'center' }}>
          Sealsui Testnet By AIRI
        </Heading>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Card variant="ghost" mb="6">
        <Box px="4" py="3">
          <Text size="2" mb="1" as="p">
            📌 <strong>Perhatian:</strong> Ini adalah contoh aplikasi untuk testnet Sealsui.
          </Text>
          <Text size="2" as="p">🧪 Gunakan wallet di Testnet. File hanya bertahan 1 epoch dan hanya mendukung gambar.</Text>
        </Box>
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
        <Text size="3" align="center" weight="medium" mt="6">Please connect your wallet to continue</Text>
      )}
    </Container>
  );
}

export default App;



