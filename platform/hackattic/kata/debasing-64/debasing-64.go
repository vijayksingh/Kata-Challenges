package main

import (
	"bufio"
	"encoding/base64"
	"fmt"
	"os"
)

func main() {
	// Define a new reader that reads from the standard ouput
	reader := bufio.NewReader(os.Stdin)
	// similar to while loop in js
	for {

		// use the reader object to read string from the user and delimit it by new line
		text, _ := reader.ReadString('\n')

		if text == "" {
			break
		}

		// convert the base64 string to buffer (raw bytes)
		bytes, _ := base64.StdEncoding.DecodeString(text)
		str := string(bytes)
		fmt.Println(str)

	}
}
