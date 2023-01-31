# Python-hacking-programs
This is a repository that contains programs for ethical hacking,using python.
The programs in order to run u should storage them with .py and cd in their path and type python program_name.py.

# create file exe - "pyinstaller.exe your_file --noconsole --onefile"

# network work with HTTP, not HTTPS

# requests == 2.5.1 - problem with pyinstaller in other version

# main problem lib netfilterqueue

# Beef - git clone https://github.com/beefproject/beef.git
cd beef && ./install  &&  ./beef
comand - clippy, Spyder Eye, Redirect

# sslstrip - 
iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-ports 10000