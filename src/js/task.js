function mystery(num) {
    if (num <= 0) {
        return 0;
    } else {
        return num + mystery(num - 1);
    }
}

// Test call
console.log(mystery(5)); // Should print 15