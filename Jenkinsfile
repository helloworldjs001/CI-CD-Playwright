// pipeline {
//     agent{
//         docker{
//             image 'node:latest'
//             args '-u root:root'
//         }
//     }

//     stages{
//             stage("log the node version"){
//                 steps{
//                     script{
//                         sh 'node --version'
//                     }
//                 }
//             }

//             stage("Install playwright"){
//                 steps{
//                     sh '''
//                     npm i -D @playwright/test
//                     npx playwright install
//                     npx playwright install-deps 
//                     '''
//                 }
//             }

//             stage("List all the test cases"){
//                 steps{
//                     sh '''
//                     npx playwright test --list
//                     '''
//                 }
//             }

//     }
// }

pipeline {
  agent {
    docker {
      image 'node:20'
      args '-u root:root'
    }
  }
  environment {
    SMTP_HOST = 'smtp.gmail.com'
    SMTP_PORT = '587'
  }
  stages {
    stage('Checkout code') {
      steps {
        git branch: 'main', url: 'https://github.com/your-repo/your-project.git'
      }
    }
    stage('Setup NodeJS') {
      steps {
        script {
          // Node.js is already set up through the Docker image
          echo "Node.js version: $(node -v)"
        }
      }
    }
    stage('Cache Node Modules') {
      steps {
        // Jenkins caches can be set up with custom plugins or scripts
        // For simplicity, this step is omitted here
        echo 'Caching Node Modules... (Not implemented in this script)'
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install'
      }
    }
    stage('Install Http Server') {
      steps {
        sh 'npm install -g http-server'
      }
    }
    stage('Start Http Server') {
      steps {
        sh 'nohup http-server -p 8080 &'
      }
    }
    stage('Wait for the server to start') {
      steps {
        script {
          // Wait for the server to be ready
          def maxRetries = 30
          def retryCount = 0
          def serverReady = false
          
          while (retryCount < maxRetries && !serverReady) {
            def response = sh(script: 'curl -s http://127.0.0.1:8080', returnStatus: true)
            if (response == 0) {
              serverReady = true
            } else {
              echo "Waiting for server to be ready..."
              sleep(time: 1, unit: 'SECONDS')
              retryCount++
            }
          }

          if (!serverReady) {
            error "Server did not start within ${maxRetries} seconds"
          }
        }
      }
    }
    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test tests/auth.spec.js'
      }
    }
  }
  post {
    success {
      script {
        emailext (
          to: 'lallsimmu80@gmail.com',
          subject: "Jenkins Build Success: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
          body: """The build was successful!

Build details:
Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}

Please find the attached report.""",
          mimeType: 'text/html',
          from: 'your-email@gmail.com',
          replyTo: 'your-email@gmail.com',
          attachmentsPattern: '**/playwright-report/**/*',
          smtpHost: "${env.SMTP_HOST}",
          smtpPort: "${env.SMTP_PORT}",
          authUser: credentials('smtp-username'),
          authPassword: credentials('smtp-password'),
          useSsl: false,
          useTls: true
        )
      }
    }
    failure {
      script {
        emailext (
          to: 'lallsimmu80@gmail.com',
          subject: "Jenkins Build Failure: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
          body: """The build failed.

Build details:
Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}

Please check the attached report and the console output for more details.""",
          mimeType: 'text/html',
          from: 'your-email@gmail.com',
          replyTo: 'your-email@gmail.com',
          attachmentsPattern: '**/playwright-report/**/*',
          smtpHost: "${env.SMTP_HOST}",
          smtpPort: "${env.SMTP_PORT}",
          authUser: credentials('smtp-username'),
          authPassword: credentials('smtp-password'),
          useSsl: false,
          useTls: true
        )
      }
    }
  }
}
