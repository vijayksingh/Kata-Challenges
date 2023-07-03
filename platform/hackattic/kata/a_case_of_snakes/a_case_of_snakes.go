package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		input := scanner.Text()

		regex := regexp.MustCompile(`([A-Z]+|\d+)[^A-Z\d]*`)
		words := regex.FindAllString(input, -1)

		if len(words) > 1 {

			for i, word := range words {
				words[i] = strings.ToLower(word)
			}

			result := strings.Join(words, "_")
			fmt.Println(result)
		}

	}
}
