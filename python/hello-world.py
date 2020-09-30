#  Python is an interpreted language.  You cannot compile it. You can just execute it.
# 
#  TO RUN:
#  python3 helloworld.py

print("Hello world! Hello from PYTHON")
print("Second line")

# This is a comment ... use '#'
# OR for multiline comments use tripple quotes
'''
This is a multi 
line 
comment
'''

# Instantiate variables
a = 1
b = 2
print(a + b)

str1 = "Hello"
str2 = "World"
print(str1 + str2)

def printme( str ):
  # "This prints a passed string into this function"
  print(str + "!!!!!!!!!!!!!!!!")
  return str



# const forgeSignature = cookieValue => {
#   const stringToSign = cookieValue;
#   const secret = 'ultrasecretkey';
#   const signature = CryptoJS.HmacSHA1(stringToSign, secret);
#   return signature.toString(CryptoJS.enc.Hex);
# };

# function printme(str){
#   console.log(str + "!!!!!!!!!!!!!!!!")
#   return str
# }


printme("I'm first call to user defined function!")

def simple():
  print("Hallo There")
  print("I Am inside the function")
print("I Am inside the function, or am I")

simple()

# Arrays
cars = ["Ford", "Volvo", "BMW"] 
print(cars[1])
niceCars = cars[1]+" and "+cars[2]
print(niceCars)

newCarArray = [cars[1], cars[2], cars[0]]

for eachCarInTheArray in newCarArray:
  print("In the for loop: " + eachCarInTheArray) 

for x in range(0, 3):
  print("We're on time %d" % (x))

for i in range(0, len(newCarArray)):
  print("Looking at car:", newCarArray[i])