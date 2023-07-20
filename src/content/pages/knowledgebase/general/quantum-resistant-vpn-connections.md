---
title: Quantum-Resistant VPN connections - IVPN Help
h1: Quantum-Resistant VPN connections
url: /knowledgebase/general/quantum-resistant-vpn-connections/
sections:
    - general
sectionTitle: General
layout: help-details
weight: 9
---
# Quantum-Resistant VPN connections

Quantum computing poses a threat to VPN security due to its potential to break classical encryption algorithms (e.g., AES, RSA) and key exchange mechanisms (e.g., Diffie-Hellman) much faster. 

## Current Problems with VPNs and Quantum Resistance

VPNs rely on encryption algorithms like AES (Advanced Encryption Standard) and RSA (Rivest-Shamir-Adleman) to secure data transmission. However, these encryption methods are vulnerable to attacks from quantum computers, which can efficiently solve the underlying mathematical problems and decrypt the data.

Quantum computing has seen significant advancements in recent years, with companies like IBM and Google investing heavily in research and development. As a result, the threat of large-scale quantum computers breaking existing encryption methods is becoming more imminent, necessitating the need for quantum-resistant encryption.

## Possible Solutions for Quantum-Resistant VPNs

### Post-Quantum Cryptography

Post-quantum cryptography focuses on developing new encryption algorithms that are resistant to quantum computing attacks. Several post-quantum algorithms are being researched, including lattice-based, code-based, and multivariate cryptographic schemes.
Currently, there are no widely-used VPN protocols that have fully adopted post-quantum cryptography (PQC). 

### Hybrid Cryptosystems

Hybrid encryption is an approach that combines classical encryption algorithms with post-quantum encryption algorithms to enhance security during the transition period when both types of cryptography coexist. The idea is to maintain compatibility with existing systems while providing quantum resistance.

In a hybrid encryption scheme, data is encrypted using two separate layers of encryption. The first layer is a classical encryption algorithm, such as AES or RSA, which is widely used and well-understood. The second layer is a post-quantum encryption algorithm, designed to be secure against quantum computers.

By combining both algorithms, even if one of them is compromised, the other layer of encryption should still provide security. In the context of quantum computing, if a quantum computer manages to break the classical encryption algorithm, the post-quantum algorithm would still protect the data.

In a VPN connection, hybrid encryption can be applied to both the data encryption process and the key exchange mechanism. For example, a VPN may use a classical key exchange protocol like Diffie-Hellman alongside a post-quantum key exchange algorithm to establish secure communication channels. Similarly, data transmitted over the VPN could be encrypted using both classical and post-quantum algorithms.

This approach ensures that VPN connections remain secure during the transition to post-quantum cryptography while maintaining compatibility with existing systems and infrastructure.

### Key Encapsulation Mechanism (KEM)

The Key Encapsulation Mechanism (KEM) is a cryptographic primitive used to securely exchange keys between two parties over an insecure channel. KEMs are designed to provide a level of security that is resistant to attacks from quantum computers.

In a VPN connection, the key exchange process is a crucial step in establishing a secure communication channel between the client and server. Traditional key exchange methods, such as Diffie-Hellman (DH) and Elliptic Curve Diffie-Hellman (ECDH), are vulnerable to attacks by quantum computers through Shor's algorithm.

Post-quantum KEMs, such as those based on lattice-based cryptography (e.g., Kyber), error-correcting codes (e.g., Classic McEliece), or multivariate cryptography, are being developed to replace traditional key exchange algorithms that are vulnerable to quantum attacks, such as the widely-used Diffie-Hellman key exchange or RSA.

In a quantum-resistant VPN, a post-quantum KEM is used to establish a shared secret between the client and the server over an insecure channel. This shared secret can then be used as a pre-shared key or as input to derive symmetric keys for encrypting and decrypting the actual data transmitted over the VPN tunnel.

#### Cryptographic libraries that support KEM:
<br>
There are several libraries available that provide Key Encapsulation Mechanism (KEM) functionality, including those implementing post-quantum cryptographic algorithms:
<br></br>

* liboqs (Open Quantum Safe): The Open Quantum Safe (OQS) project, led by the Centre for Applied Cryptographic Research at the University of Waterloo and the National Research Council of Canada, provides the liboqs library. liboqs is a C library that offers a collection of quantum-resistant cryptographic algorithms, including key encapsulation mechanisms and digital signature schemes. The library serves as a testing ground for experimental algorithms and is intended for research and development purposes. You can find the liboqs library on [GitHub](https://github.com/open-quantum-safe/liboqs).

* PQClean: PQClean is another library that offers a collection of implementations of post-quantum cryptography schemes, including KEMs. It focuses on providing clean, secure, and portable implementations of these schemes, which are suitable for integration into various cryptographic libraries and applications. PQClean is available on [GitHub](https://github.com/PQClean/PQClean).

* CRYSTALS (Cryptographic Suite for Algebraic Lattices) libraries: The CRYSTALS project provides implementations of lattice-based cryptographic schemes, including the Kyber KEM and Dilithium digital signature algorithm. Both Kyber and Dilithium are finalists in the NIST Post-Quantum Cryptography Standardization process. The implementations can be found on GitHub ([Kyber](https://github.com/pq-crystals/kyber), [Dilithium](https://github.com/pq-crystals/dilithium)).

These libraries provide a starting point for developers and researchers interested in experimenting with KEM functionality, particularly for post-quantum cryptography. It is important to note that many of these implementations are intended for research, development, and testing purposes, and their security and performance should be carefully evaluated before integrating them into production environments.

## Implementing Quantum Resistance in WireGuard using PresharedKey

WireGuard connections, by default, are not quantum-resistant. WireGuard uses the ChaCha20 encryption algorithm, Poly1305 for authentication, and Curve25519 for key exchange, which are considered secure against classical attacks but are vulnerable to quantum computing attacks.
To make WireGuard connections more quantum-resistant, a PresharedKey (PSK) can be used in addition to the existing encryption. This adds an extra layer of symmetric encryption to the connection, making it more difficult for potential quantum attackers to break the encryption. 

<div markdown="1" class="notice notice--warning">
Note, this approach doesn't make the connection entirely quantum-proof as it still relies on classical cryptographic primitives.
<br></br>
For complete quantum resistance, a transition to post-quantum cryptographic algorithms is necessary. These algorithms are designed to be secure against both classical and quantum computing attacks. In the future, it's expected that VPN protocols, including WireGuard, will incorporate post-quantum cryptography to provide enhanced security.
</div>

### Preshared Key (PSK) Concept

The WireGuard configuration includes an optional parameter called "PresharedKey" which can be used to enhance the security of the VPN connection.

A PresharedKey (PSK) is a secret key that is shared between the VPN client and server before establishing a connection. The PSK is used to add an additional layer of symmetric encryption, making it more difficult for attackers to break the connection.

Using a Key Encapsulation Mechanism (KEM) with a PresharedKey (PSK) can potentially increase the quantum resistance of a WireGuard connection, provided that the KEM is based on a post-quantum cryptographic algorithm.

### Exchanging PresharedKey using KEM

The table below is illustrating the algorithm/logic for exchanging a PresharedKey between the client and server using a post-quantum Key Encapsulation Mechanism (KEM).

![](/images-static/uploads/quantum-resistance-1.png)

As an example, here is a Go-lang implementation of sharing a PresharedKey using a Key Encapsulation (the example uses liboqs-go, which is a wrapper for the original liboqs library):

[Client](https://github.com/open-quantum-safe/liboqs-go/blob/main/examples/client_server_kem/client/client_kem.go) | [Server](https://github.com/open-quantum-safe/liboqs-go/blob/main/examples/client_server_kem/server/server_kem.go)

## Communication channels for exchanging PSK

### Use the initial WireGuard tunnel 

Using this approach the PSK is generating each time before the connection starts. But it uses an initial WireGuard connection for key exchange.

![](/images-static/uploads/quantum-resistance-2.png)

*Pros*: If the API server is blocked for the user, but they are able to access the WireGuard server, we can bypass such blocks and access the API server through the WireGuard tunnel

*Cons*: The need to establish an additional WireGuard tunnel, which will lead to extra delays before establishing a real connection

### Use REST API over HTTPS

Since the Key Encapsulation Mechanism is developed to securely exchange keys between two parties over an insecure channel, it does not matter which channel to use. Using a simple API call before each WireGuard connection will be much easier, e.g.:

![](/images-static/uploads/quantum-resistance-3.png)

*Pros*: Easy to implement

*Cons*: Impossible to exchange PSK when the API server is not accessible to a user

### Use REST API over HTTPS only when regenerating WG keys

Using this method, the PSK is updated during the WireGuard keys regeneration phase.

*Pros*: Easy to implement

*Cons*: Using the same PSK for each connection, until the new WireGuard keys are regenerated

## The IVPN solution of quantum-resistant WireGuard connections

IVPN apps and infrastructure make use of the last method for exchanging PSK (via REST API over HTTPS during WireGuard key regeneration phase) with multiple KEM Algorithms for enhanced security.

The aim of using multiple KEM algorithms for PresharedKey generation is to increase the overall security and robustness of the key exchange process. By combining different KEM algorithms, we create a "hybrid" approach that mitigates the risk of any single algorithm being compromised or broken by an attacker, whether it be a classical or quantum computer. This strategy helps to ensure that even if one algorithm is found to be vulnerable, the other algorithm(s) can still provide a strong level of security for the key exchange.

Chosen algorithms:

1. Kyber (Kyber-1024). Kyber is one of the finalists in the NIST post-quantum cryptography project. It has a high Claimed NIST Level and it has not too long Public-Key size (1568 bytes).

2. Classic McEliece (Classic-McEliece-348864). It is based on the McEliece cryptosystem, and its security has been studied and withstood attacks for decades. The main disadvantage is the large public key size. That's why we use the Classic-McEliece-348864 variant with the lowest NIST level, as it utilizes the smallest key size possible for this algorithm (261120 bytes).

A PresharedKey rotation is integrated into the current mechanism of WireGuard key rotation using a quantum-resistant Key Encapsulation Mechanism:

* The Client sends multiple public keys (public key for each KEM algorithm)
* The Server returns multiple ciphers (secrets encoded by different KEM algorithms)

The resulted PresharedKey is calculated as the SHA256 sum of all ciphers by both, client and server, and is used in hardening WireGuard connections against quantum computer attacks.

### Conclusion

Quantum computing presents a significant threat to the security of VPN connections. By adopting post-quantum cryptography and implementing quantum-resistant measures like PresharedKeys in WireGuard, VPN providers can ensure the privacy and security of their users in a post-quantum world.
