---
layout: "../../layouts/BlogPost.astro"
title: "Registry, Credentials and Wallet (RCW)"
description: "Project Description for RCW"
pubDate: "Dec 31 2023"
---

## Introduction

**Registry, Credentials and Wallet (RCW)** is a project that implements the core [Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) (VC) Specification published by W3C.

Initial implemenetation of RCW was done as the core credentialling services for the [Unified Learner's Passbook (ULP)](https://github.com/unified-Learner-Passbook/) project which was proposed in the [National Education Policy, 2020 (NEP 2020)](https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf) by Ministry of Education, Government of India. ULP is launched and deployed in the state of **Uttar Pradesh, India** (most populous state of India). 

Later the core services, namely, [Credential-MS](https://github.com/unified-Learner-Passbook/credential-ms), [Cred-Schema-MS](https://github.com/Unified-Learner-Passbook/Cred-schema-ms) and [Identity](https://github.com/Unified-Learner-Passbook/identity) were abstracted out and became what we are calling as [Registry, Credentials and Wallet (RCW)](https://github.com/SamagraX-RCW).

## Architecture, Tech Stack and Deployment

These services follow a **microservices architecture** to enable credentialling in your project. The architecture of how these services work with each other is shown in the picture below.

![RCW Architecture](/rcw-arch.png)

Each of these services are built using `NestJS` with `TypeScript` and come bundled with `Dockerfile`, `Jenkinsfile` and `Ansible` roles for easy deployment. The [RCW Github Organisation](https://github.com/SamagraX-RCW) has the [devops](https://github.com/SamagraX-RCW/devops) which hosts a one click deployment mechanism of these services to be used in any project.


## References

- [Verifiable Credentials Specification](https://www.w3.org/TR/vc-data-model/)
- [National Education Policy 2020](https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf)
- [Unified Learner's Passbook Github](https://github.com/unified-Learner-Passbook/)
- [RCW Github](https://github.com/SamagraX-RCW)