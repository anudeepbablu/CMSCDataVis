
Instructions:

1. Install Python 2.7
2. Open CMD
3. Redirect to the folder where project is present - cd "directory_name"
4. Type "python -m SimpleHTTPServer 8080"
5. Open "http://localhost:8080/test_images.html"


HomeWork 5:

1. I'm able to plot 16 symbols. You can observe the legend at the end of the page.
2. I have take pattern.txt and implemented all the symbols(due to limitation in screen size, it is hard to see all symbols without zoom).
3. Preprocessing step in implemented on the go. That is, whenever the code is run, it process the data again from scratch.

Critical Analysis:

Given a particular requirement from user in the form of trajectory, this visualization provides a very clear identification of disease pairs. We have 16 colors in total. By adding colors to these 16 symbols we can increase the number of disease pairs that we ccan identify. For example, take 4 colors which can be clearly differentiable, then there will 16 * 4 = 64 different symbols. This helps us to identify more number of patterns. But, on the flip side if the number of disease pairs is more visualization can be cluttered. 


Pros:

1. Clearly differentiable symbols.
2. A pattern can be observed from the visualization.

Cons:

1. Limitation to only 16 symbols.
2. Symbols not visible due to limited screen space.
3. Visually not pleasing and strainful to eyes, if the number of disease pairs is more.
