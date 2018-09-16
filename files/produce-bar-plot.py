import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import matplotlib as mpl
import seaborn as sns
mpl.rcParams['figure.figsize'] = [7,8]
mpl.rcParams['figure.dpi'] = 80
mpl.rcParams['savefig.dpi'] = 200

mpl.rcParams['font.size'] = 17
mpl.rcParams['legend.fontsize'] = 'large'
mpl.rcParams['figure.titlesize'] = 'medium'
mpl.rcParams['lines.linewidth'] = 2.5
mpl.rcParams['lines.markersize'] = 10

import seaborn as sns
sns.set_context("poster", rc={"font.size":15,"axes.titlesize":15,"axes.labelsize":15}) 


index = ['Local','Import','Regional']
roman = [ 222771, 1536, 237 ]
byzantine = [ 410818, 1665, 448 ]
islamic = [ 384837, 1656, 886 ]
df = pd.DataFrame({ 'Roman Period':roman, 'Byzantine Period':byzantine,
                    'Early Islamic Period':islamic }, index=index)

axes = df.plot.bar(rot=0, subplots=True, legend=False,
                   #sharex=False,
                   ylim=[-2000,600000],
                   figsize=(7,9))
    
for ax in axes:
    for p in ax.patches:
        ax.annotate(str(p.get_height()), (p.get_x()*1.08, p.get_height() * 1.05 + 15000))


plt.tight_layout()
plt.savefig('/home/chico/Dropbox/Sandcastles/Jerash/jerash/images/bar_plot2.png', dpi=200)
plt.show()
