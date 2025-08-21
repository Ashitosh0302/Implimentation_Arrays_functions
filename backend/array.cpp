#include <bits/stdc++.h>
using namespace std;

vector<int> arr;

int main(int argc, char* argv[])
{
    string command = argv[1];  // add, delete, insert, search, size, get

    if (command == "add") {
        int value = stoi(argv[2]);
        arr.push_back(value);
    }
    else if (command == "delete") {
        int value = stoi(argv[2]);
        auto it = find(arr.begin(), arr.end(), value);
        if (it != arr.end()) {
        arr.erase(it);
        }
    }
    else if (command == "insert") {
        int index = stoi(argv[2]);
        int value = stoi(argv[3]);
        if (index >= 0 && index <= arr.size()) {
            arr.insert(arr.begin() + index, value);
        }
    }
    else if (command == "search") {
        int value = stoi(argv[2]);
        int index = -1;
        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] == value) {
                index = i;
                break;
            }
        }
        cout << index;
        return 0;
    }
    else if (command == "size") {
        cout << arr.size();
        return 0;
    }

    // print array as JSON
    cout << "[";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i];
        if (i != arr.size() - 1) cout << ",";
    }
    cout << "]";
    return 0;
}
