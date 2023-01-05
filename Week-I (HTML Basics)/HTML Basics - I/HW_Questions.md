

- Read the HTML MDN Web Docs. Read documentation to understand every tags, attributes , etc.

- Q. Html elements have attribute-> ? Any exception? -> H/W

  A. Not all HTML elements are required to have attributes. Some tags like <p>, <h1>, usually dont use any attributes; while on the other hand there are elements like <img> which must use attributes like src="", and alt="", <a> tag which must use the href="" attribute to show the hyperlink.
  Other than these attributes, all html elements can be given a 'style' attribute to enable in-line CSS to style those elements.

  However there is an exception, where we can use "custom attributes" on any HTML elements. For example, we can say:

   <h1 custom-attribute = "Some Value" > Hello World </h1>  Here we have defined a custom attribute in the H1 tag.

   This type of attributes are useful when we want to add some custom functionality to the element using JavaScript. The custom attribute is not part of the normal HTML specification, and we are defining it our self to use it with our Scripts.

- Q. What happens when we close an empty tag?

  A.  If we attempt to close an empty tag, for example- <br></br>; here the HTML parser will not recogonize the closing-tag. It will treat it as plain text, and not recogonize it as a valid empty tag. Doing so might cause issues in the structure of the HTML document and also cause incorrect information to be displayed.