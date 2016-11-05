// 通信用モジュール
#include <HttpClient_ESP8266_AT.h>

// 心拍センサ用
int pulsePin = 0;                 // Pulse Sensor purple wire connected to analog pin 0
int blinkPin = 13;                // pin to blink led at each beat
int fadePin = 5;                  // pin to do fancy classy fading blink at each beat
int fadeRate = 0;                 // used to fade LED on with PWM on fadePin

// Volatile Variables, used in the interrupt service routine!
volatile int BPM;                   // int that holds raw Analog in 0. updated every 2mS
volatile int Signal;                // holds the incoming raw data
volatile int IBI = 600;             // int that holds the time interval between beats! Must be seeded! 
volatile boolean Pulse = false;     // "True" when User's live heartbeat is detected. "False" when not a "live beat". 
volatile boolean QS = false;        // becomes true when Arduoino finds a beat.

// Regards Serial OutPut  -- Set This Up to your needs
static boolean serialVisual = false;   // Set to 'false' by Default.  Re-set to 'true' to see Arduino Serial Monitor ASCII Visual Pulse 

// wifi通信に必要なPinの設定
const byte rxPin = 2; // Wire this to Tx Pin of ESP8266
const byte txPin = 3; // Wire this to Rx Pin of ESP8266
HttpClient_ESP8266_AT httpClient(rxPin, txPin);

void setup() {
    // HardwareSerial settings
    Serial.begin(9600);

    // Setup HttpClient_ESP8266_AT
    while(true) {
        if(httpClient.statusAT()) { Serial.println("AT status OK"); break; }
        else Serial.println("AT status NOT OK");
        delay(1000);
    }
    while(true) {
        if(httpClient.connectAP("meijo-guest", "jphacks2016")) { Serial.println("Successfully connected to an AP"); break; }
        else Serial.println("Failed to connected to an AP. retrying...");
        delay(1000);
    }
    while(true) {
        if(httpClient.statusWiFi()) { Serial.println("WiFi status OK"); break; }
        else Serial.println("WiFi status NOT OK");
        delay(1000);
    }

  // 心拍センサの呼び出し
  pinMode(blinkPin,OUTPUT);         // pin that will blink to your heartbeat!
  pinMode(fadePin,OUTPUT);          // pin that will fade to your heartbeat!
  interruptSetup();                 // sets up to read Pulse Sensor signal every 2mS 
}

void loop() {
    while(true) {
        // Let's start HTTP POST request

        if(QS == true){
          // 心拍測定
          fadeRate = 255;         // Makes the LED Fade Effect Happen
                                // Set 'fadeRate' Variable to 255 to fade LED with pulse
          serialOutputWhenBeatHappens();   // A Beat Happened, Output that to serial.  
          QS = false;
          String tmp = String(BPM);
//          Serial.println("tmp" + tmp);
//          Serial.println("B" + BPM);
          String tmp2 = String("post[bpm]=" + tmp);
          Serial.println(tmp2);
          httpClient.post("hidden-forest-81120.herokuapp.com", "/posts", tmp2, "application/x-www-form-urlencoded");
//          httpClient.post("192.168.90.29", "/posts", tmp2, "application/x-www-form-urlencoded", 3000);
        }else{
          // 心拍が図れていない状態
        }
        

        // Check the request data was sent successfully without timeout.
        //   -1: timeout error (request data was NOT sent)
        //    0: response parse error (request data sent SUCCESSFULLY, but response data was corrupted)
        //   else (>0): HTTP status code (200, 404, 500, 302,.. etc.)

        if(httpClient.responseStatusCode() >= 0) {
            // Serial data without parity check may be corrupted.
            // So, in this example, we do not care the actual value of it.
            // (The fact that request data was sent is important.)
            Serial.println(httpClient.responseStatusCode());
            Serial.println("SUCCESS");
            break;
        }
        else {
            Serial.println("FAILURE, retrying...");
        }
    }
    delay(1000);
}

void ledFadeToBeat(){
    fadeRate -= 15;                         //  set LED fade value
    fadeRate = constrain(fadeRate,0,255);   //  keep LED fade value from going into negative numbers!
    analogWrite(fadePin,fadeRate);          //  fade LED
}
