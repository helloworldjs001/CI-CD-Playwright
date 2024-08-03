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


            stage("Install Http Server"){
                steps{
                    sh 'npm i -g http-server'
                }
            }
            
            stage("Start Http Server"){
                steps{
                    sh ' http-server -p 8080 &'
                }
            }

            stage("Wait for Http Server to start"){
                steps{
                    script{
                        def maxRetires = 50
                        def retryCount = 0
                        def serverReady = false


                        while (retryCount < maxRetires && !serverReady){
                            def response = sh(script: 'curl -s http://127.0.0.1:8080', returnStatus : true)

                            if(response == 0){
                                serverReady = true
                            }
                            else{
                                echo "Waiting for Http Server to start"
                                sleep(time:1, unit:'SECONDS')
                                retryCount++
                            }
                        }

                        if(!serverReady){
                            error "Server is not ready with ${maxRetires} seconds"
                        }
                    }
                }
            }

             stage("List all the test cases"){
                steps{
                    sh '''
                    npx playwright test --list
                    '''
                }
            }

            stage("Run the test case"){
                steps{
                    sh '''
                    npx playwright test tests/auth.spec.js --reporter=html
                    
                    echo "Listing the files in the report directory"
                    ls -al playwright-report/
                    '''
                }
            }

            stage("Archive Report"){
                steps{
                    archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive : true
                }
            }


    }

   post {
        always {
            script {
                emailext (
                    to: 'test.adam011@gmail.com',
                    subject: "Jenkins Build: ${currentBuild.currentResult} - ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                    body: """Build ${currentBuild.currentResult}!

Build details:


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
    }

}
