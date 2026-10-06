-- =====================================================
-- CAMPUS HUB - DATABASE SEED SCRIPT
-- Run this in MySQL Workbench after Spring Boot has
-- started once (so it creates all the tables first).
-- =====================================================

USE campushub;

-- Clear existing data (safe for dev)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE users;
TRUNCATE TABLE academic_records;
TRUNCATE TABLE canteen_items;
TRUNCATE TABLE exam_timetable;
TRUNCATE TABLE fees;
TRUNCATE TABLE notices;
TRUNCATE TABLE timetable;
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- ADMIN USER
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Admin', 'ADMIN001', 'admin123', 'ADMIN', NULL, NULL);

-- =====================================================
-- TEACHING STAFF
-- Username format: FIRSTNAME + LASTNAME_INITIAL (uppercase)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Athira AG',      'ATHIRAAG',      'staff@123', 'TEACHER', NULL, NULL),
('Anjali AB Nair', 'ANJALIAB',      'staff@123', 'TEACHER', NULL, NULL),
('Aswanth Sunil',  'ASWANTHS',      'staff@123', 'TEACHER', NULL, NULL),
('Meera S Kumar',  'MEERASK',       'staff@123', 'TEACHER', NULL, NULL),
('Rahul K Menon',  'RAHULKM',       'staff@123', 'TEACHER', NULL, NULL),
('Neethu P Nair',  'NEETHUPN',      'staff@123', 'TEACHER', NULL, NULL),
('Sreelekha R',    'SREELEKHAR',    'staff@123', 'TEACHER', NULL, NULL),
('Nikhil S Nair',  'NIKHILSN',      'staff@123', 'TEACHER', NULL, NULL),
('Divya P Menon',  'DIVYAPM',       'staff@123', 'TEACHER', NULL, NULL);

-- =====================================================
-- NON-TEACHING STAFF
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Prathap Krishnan', 'PRATHAPK',   'staff@123', 'NON_TEACHER', NULL, NULL),
('Bindhya',          'BINDHYA',    'staff@123', 'NON_TEACHER', NULL, NULL),
('Able Alex',        'ABLEALEX',   'staff@123', 'NON_TEACHER', NULL, NULL);

-- =====================================================
-- STUDENTS — 2025-29 BCA  (Roll 01–10)
-- Username: NAME + 2025 + 29 + BCA + ROLLNO
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Al Fayaz',             'ALFAYAZ202529BCA01',           'student@123', 'STUDENT', 'BCA', '2025-29'),
('Mohammed Atif Ehsaan', 'MOHAMMEDATIF202529BCA02',       'student@123', 'STUDENT', 'BCA', '2025-29'),
('Adithyan B',           'ADITHYANB202529BCA03',          'student@123', 'STUDENT', 'BCA', '2025-29'),
('Manas J',              'MANASJ202529BCA04',             'student@123', 'STUDENT', 'BCA', '2025-29'),
('Mohammed Nafi Naissam','MOHAMMEDNAFI202529BCA05',        'student@123', 'STUDENT', 'BCA', '2025-29'),
('Adil Muhammed N',      'ADILMUHAMMED202529BCA06',       'student@123', 'STUDENT', 'BCA', '2025-29'),
('Amina S',              'AMINAS202529BCA07',             'student@123', 'STUDENT', 'BCA', '2025-29'),
('Sadiya Mariyam',       'SADIYAM202529BCA08',            'student@123', 'STUDENT', 'BCA', '2025-29'),
('Safiya T',             'SAFIYAT202529BCA09',            'student@123', 'STUDENT', 'BCA', '2025-29'),
('Anna Gomez',           'ANNAGOMEZ202529BCA10',          'student@123', 'STUDENT', 'BCA', '2025-29');

-- =====================================================
-- STUDENTS — 2026-30 BCA  (Roll 01–08)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Daniel Philip Varghese','DANIELPHILIP202630BCA01',      'student@123', 'STUDENT', 'BCA', '2026-30'),
('Ijas Muhammed',          'IJASMUHAMMED202630BCA02',     'student@123', 'STUDENT', 'BCA', '2026-30'),
('Gopika SM',              'GOPIKASM202630BCA03',         'student@123', 'STUDENT', 'BCA', '2026-30'),
('Angagha S',              'ANGAGHAS202630BCA04',         'student@123', 'STUDENT', 'BCA', '2026-30'),
('Theertha K',             'THEERTHAK202630BCA05',        'student@123', 'STUDENT', 'BCA', '2026-30'),
('Harigovind',             'HARIGOVIND202630BCA06',       'student@123', 'STUDENT', 'BCA', '2026-30'),
('Shahul Hameed SJ',       'SHAHULHAMEED202630BCA07',     'student@123', 'STUDENT', 'BCA', '2026-30'),
('Colin Elvin Fernandes',  'COLINELVIN202630BCA08',       'student@123', 'STUDENT', 'BCA', '2026-30');

-- =====================================================
-- STUDENTS — 2025-29 BBA  (Roll 01–10)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Afnan A',              'AFNANA202529BBA01',             'student@123', 'STUDENT', 'BBA', '2025-29'),
('Mohammed Shazin K',    'MOHAMMEDSHAZIN202529BBA02',     'student@123', 'STUDENT', 'BBA', '2025-29'),
('Akhil Raj R',          'AKHILRAJ202529BBA03',           'student@123', 'STUDENT', 'BBA', '2025-29'),
('Nithin Krishna P',     'NITHINKRISHNA202529BBA04',      'student@123', 'STUDENT', 'BBA', '2025-29'),
('Adarsh S',             'ADARSHSBBA202529BBA05',         'student@123', 'STUDENT', 'BBA', '2025-29'),
('Fathima Hiba P',       'FATHIMAHIBA202529BBA06',        'student@123', 'STUDENT', 'BBA', '2025-29'),
('Diya Maria Thomas',    'DIYAMARIA202529BBA07',          'student@123', 'STUDENT', 'BBA', '2025-29'),
('Anagha R',             'ANAGHAR202529BBA08',            'student@123', 'STUDENT', 'BBA', '2025-29'),
('Keerthana S',          'KEERTHANAS202529BBA09',         'student@123', 'STUDENT', 'BBA', '2025-29'),
('Nayana N',             'NAYANAN202529BBA10',            'student@123', 'STUDENT', 'BBA', '2025-29');

-- =====================================================
-- STUDENTS — 2026-30 BBA  (Roll 01–10)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Mohammed Riyas K',     'MOHAMMEDRIYAS202630BBA01',      'student@123', 'STUDENT', 'BBA', '2026-30'),
('Arjun S',              'ARJUNS202630BBA02',             'student@123', 'STUDENT', 'BBA', '2026-30'),
('Vishnu Prasad P',      'VISHNUPRASAD202630BBA03',       'student@123', 'STUDENT', 'BBA', '2026-30'),
('Adil Rahman M',        'ADILRAHMAN202630BBA04',         'student@123', 'STUDENT', 'BBA', '2026-30'),
('Sreerag R',            'SREERAGR202630BBA05',           'student@123', 'STUDENT', 'BBA', '2026-30'),
('Fathima Zahra K',      'FATHIMAZAHRA202630BBA06',       'student@123', 'STUDENT', 'BBA', '2026-30'),
('Hana Mariyam P',       'HANAMARIYAM202630BBA07',        'student@123', 'STUDENT', 'BBA', '2026-30'),
('Meera Nair S',         'MEERANAIR202630BBA08',          'student@123', 'STUDENT', 'BBA', '2026-30'),
('Aleena Joseph T',      'ALEENAJOSEPH202630BBA09',       'student@123', 'STUDENT', 'BBA', '2026-30'),
('Aiswarya R',           'AISWARYAR202630BBA10',          'student@123', 'STUDENT', 'BBA', '2026-30');

-- =====================================================
-- STUDENTS — 2025-29 BCOM  (Roll 01–10)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Mohammed Asif K',      'MOHAMMEDASIF202529BCOM01',      'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Anandhu S',            'ANANDHUS202529BCOM02',          'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Rishan P',             'RISHANP202529BCOM03',           'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Rahul Krishna R',      'RAHULKRISHNA202529BCOM04',      'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Nikhil Das M',         'NIKHILDAS202529BCOM05',         'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Fathima Sana T',       'FATHIMASANA202529BCOM06',       'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Afnan Fathima K',      'AFNANFATHIMA202529BCOM07',      'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Neha Maria J',         'NEHAMARIA202529BCOM08',         'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Devika S',             'DEVIKAS202529BCOM09',           'student@123', 'STUDENT', 'BCOM', '2025-29'),
('Anjana R',             'ANJANAR202529BCOM10',           'student@123', 'STUDENT', 'BCOM', '2025-29');

-- =====================================================
-- STUDENTS — 2026-30 BCOM  (Roll 01–10)
-- =====================================================
INSERT INTO users (name, username, password, role, course, batch) VALUES
('Muhammed Irfan P',     'MUHAMMEDIRFAN202630BCOM01',     'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Adarsh K',             'ADARSHK202630BCOM02',           'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Nandu Krishna S',      'NANDUKRISHNA202630BCOM03',      'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Amal Raj R',           'AMALRAJR202630BCOM04',          'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Rinshad M',            'RINSHADM202630BCOM05',          'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Hiba Fathima A',       'HIBAFATHIMA202630BCOM06',       'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Afra Mariyam K',       'AFRAMARIYAM202630BCOM07',       'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Gopika S',             'GOPIKAS202630BCOM08',           'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Malavika R',           'MALAVIKAR202630BCOM09',         'student@123', 'STUDENT', 'BCOM', '2026-30'),
('Christina Maria J',    'CHRISTINAMARIA202630BCOM10',    'student@123', 'STUDENT', 'BCOM', '2026-30');

-- =====================================================
-- SAMPLE ACADEMIC RECORDS — 2025-29 BCA
-- (Attendance, First & Second Internal, Semester Marks)
-- =====================================================
INSERT INTO academic_records (student_username, student_name, course, batch, subject, attendance_percentage, first_internal_mark, second_internal_mark, semester_mark) VALUES
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Programming in C', 88.5, 42, 39, 72),
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Computer Fundamentals & IT', 91.0, 45, 43, 78),
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Digital Electronics', 76.0, 36, 38, 65),
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Mathematics for Computer Science', 82.0, 40, 41, 70),
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Communication Skills', 95.0, 47, 46, 82),
('ALFAYAZ202529BCA01', 'Al Fayaz', 'BCA', '2025-29', 'Office Automation', 89.0, 44, 43, 75);

-- =====================================================
-- SAMPLE CANTEEN MENU
-- =====================================================
INSERT INTO canteen_items (item_name, price, category) VALUES
('Veg Samosa',      10.00, 'SNACKS'),
('Egg Puff',        15.00, 'SNACKS'),
('Tea',             10.00, 'SNACKS'),
('Coffee',          12.00, 'SNACKS'),
('Banana Fritter',   8.00, 'SNACKS'),
('Rice Meals',      60.00, 'LUNCH'),
('Chicken Curry',   80.00, 'LUNCH'),
('Dal Fry',         50.00, 'LUNCH'),
('Chapathi (2pcs)', 30.00, 'LUNCH'),
('Curd Rice',       40.00, 'LUNCH');

-- =====================================================
-- SAMPLE NOTICE
-- =====================================================
INSERT INTO notices (title, description, date_posted) VALUES
('Welcome to Campus Hub!', 'This is the official notice board of the campus. All important announcements, events, and circulars will be posted here. Please check regularly.', '2026-07-01');

-- =====================================================
-- SAMPLE FEE RECORDS — 2025-29 BCA
-- =====================================================
INSERT INTO fees (student_username, student_name, course, batch, amount_paid, date_paid, status) VALUES
('ALFAYAZ202529BCA01',      'Al Fayaz',             'BCA', '2025-29', 25000.00, '2026-06-15', 'PAID'),
('MOHAMMEDATIF202529BCA02', 'Mohammed Atif Ehsaan', 'BCA', '2025-29', 0.00,     NULL,          'PENDING'),
('ADITHYANB202529BCA03',    'Adithyan B',           'BCA', '2025-29', 25000.00, '2026-06-10', 'PAID'),
('MANASJ202529BCA04',       'Manas J',              'BCA', '2025-29', 0.00,     NULL,          'PENDING'),
('MOHAMMEDNAFI202529BCA05', 'Mohammed Nafi Naissam','BCA', '2025-29', 25000.00, '2026-06-20', 'PAID'),
('ADILMUHAMMED202529BCA06', 'Adil Muhammed N',      'BCA', '2025-29', 25000.00, '2026-06-18', 'PAID'),
('AMINAS202529BCA07',       'Amina S',              'BCA', '2025-29', 0.00,     NULL,          'PENDING'),
('SADIYAM202529BCA08',      'Sadiya Mariyam',       'BCA', '2025-29', 25000.00, '2026-06-12', 'PAID'),
('SAFIYAT202529BCA09',      'Safiya T',             'BCA', '2025-29', 25000.00, '2026-06-14', 'PAID'),
('ANNAGOMEZ202529BCA10',    'Anna Gomez',           'BCA', '2025-29', 0.00,     NULL,          'PENDING');

SELECT 'Seed data inserted successfully!' AS status;
