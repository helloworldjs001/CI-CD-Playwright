pipeline {
    agent{
        docker{
            image 'node:latest'
            args '-u root:root'
        }
    }

    stages{
            stage("log the node version"){
                steps{
                    script{
                        sh 'node --version'
                    }
                }
            }

            stage("Install playwright"){
                steps{
                    sh '''
                    npm i -D @playwright/test
                    npx playwright install
                    npx playwright install-deps 
                    '''
                }
            }

            stage("List all the test cases"){
                steps{
                    sh '''
                    npx playwright test --list
                    '''
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
          def maxRetries = 5
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
}